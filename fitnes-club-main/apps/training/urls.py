from django.urls import path
from apps.training.views import ParticipantTrainingCreate, UserParticipantTrainingList, AbonomentAplicationCreate, \
    JoinTrainingCreate



urlpatterns = [
    path('participant-training/', ParticipantTrainingCreate.as_view(), name='participant-training-create'),
    path('participant-training-list/', UserParticipantTrainingList.as_view(), name='participant-training-list'),
    path('abonoment-aplication/', AbonomentAplicationCreate.as_view(), name='abonoment-aplication-create'),
    path('join-training/', JoinTrainingCreate.as_view(), name='join-training-create'),
]
