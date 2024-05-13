from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from apps.training.models import JoinTraining, AbonomentAplication
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode
from apps.accounts.models import User


class JSONSerializerField(serializers.Field):
    """ Serializer for JSONField -- required to make field writable"""

    def to_internal_value(self, data):
        return data

    def to_representation(self, value):
        return value


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    password2 = serializers.CharField(min_length=6, max_length=68, write_only=True)

    class Meta:
        model = User 
        fields = ("first_name", "last_name", "email", 'phone_number', "password", "password2")

    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.get("password2")
        phone_number = attrs.get("phone_number")
        email = attrs.get("email")


        if password != password2:
            raise serializers.ValidationError({"success": False, "message": "Пароли не совпадают"})
        return attrs

        if phone_number and User.objects.filter(phone_number=phone_number).exists():
            raise serializers.ValidationError(
                {"success": False, "message": "Пользователь с таким номером телефона уже существует"})
        return attrs

        if email and User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                {"success": False, "message": "Пользователь с таким email уже существует"})
        return attrs


    def create(self, validated_data):
        del validated_data["password2"]
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ("id", "email", "password")

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = authenticate(email=email, password=password)
        if not user:
            raise AuthenticationFailed({"success": False, "message": "Неверный логин или пароль"})

        attrs["user"] = user
        return attrs


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ['token']


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        fields = ['email']


class PasswordUpdateSerializer(serializers.Serializer):
    password_true = serializers.CharField(min_length=6, max_length=68, write_only=True)
    password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    password2 = serializers.CharField(min_length=6, max_length=68, write_only=True)

    def validate(self, attrs):
        password = attrs.get('password')
        password_true = attrs.get('password_true')
        password2 = attrs.get('password')
        user = self.context.get('user')
        user = authenticate(email=user.email, password=password_true)
        if not user:
            raise AuthenticationFailed({"success": False, "message": "Неверный пароль"})
        if password != password2:
            raise AuthenticationFailed({"success": False, "message": "Пароли не совпадают"})
        attrs['user'] = user
        return attrs


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')
            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)
            user.set_password(password)
            user.save()

            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
        return super().validate(attrs)


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):

        try:
            RefreshToken(self.token).blacklist()

        except TokenError:
            self.fail('bad_token')


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class UserUpdateEmailSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=False)
    class Meta:
        model = User
        fields = ("email", "first_name", "email", "phone_number", "avatar", 'last_name', 'father_name',)
    
    
class UserTrainingSerializer(serializers.ModelSerializer):
    service_title = serializers.SerializerMethodField()


    def get_service_title(self, obj):
        return obj.schedule.service.service_type

    class Meta:
        model = JoinTraining
        fields = ("service_title", )
        read_only_fields = ('user',)



class UserAbonomentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AbonomentAplication
        fields = ("type", )
        read_only_fields = ('user',)




class ProfileSerializer(serializers.ModelSerializer):

    service_title = serializers.SerializerMethodField()
    abonoment = serializers.SerializerMethodField()


    def get_abonoment(self, obj):
        user = AbonomentAplication.objects.filter(user=obj)
        return UserAbonomentSerializer(user, many=True).data


    def get_service_title(self, obj):
        user = JoinTraining.objects.filter(user=obj)
        return UserTrainingSerializer(user, many=True).data

    class Meta:
        model = User
        fields = ("email",   "active_user",  "code", "data_activate", "data_expired", "service_title", "abonoment")
