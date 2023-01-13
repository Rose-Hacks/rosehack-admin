import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function deleteUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await updateDoc(doc(db, "users", req.body.result), {
      checkin: true,
      got_shirt: true,
    });
    res.status(200).json({});
  } catch {
    res.status(500).json({});
  }
}
