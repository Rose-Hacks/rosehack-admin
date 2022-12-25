import React, { useEffect } from "react";
import type { NextPage } from "next";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const Index: NextPage = () => {
  useEffect(() => {
    const call = async () => {
      const snapshot = await getDoc(doc(db, "users", "rosehack@gmail.com"));
      console.log(snapshot.data());
    };

    void call();
  }, []);

  return <div className="font-lexend">hello world, testing</div>;
};

export default Index;
