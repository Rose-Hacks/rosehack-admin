import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function updateStatus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await updateDoc(doc(db, "users", req.body.email), {
    status: req.body.status,
  });
  res.status(200).json({});
}
