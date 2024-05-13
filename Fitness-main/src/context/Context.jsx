import { createContext, useContext, useState } from "react";
const Context = createContext();

const ContextProvider = ({ children }) => {
  const [mainavatar, setMainavatar] = useState("");
  const [firstname, setFirstname] = useState("");
  const [refresh, setRefresh] = useState(false);
  return (
    <Context.Provider
      value={{
        mainavatar,
        setMainavatar,
        firstname,
        setFirstname,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
