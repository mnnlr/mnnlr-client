import { useState } from "react"
import axios from "axios";

export const useGetWorkspaceData = () => {
  const [isWorkspaceDataLoading, setWorkspaceDataLoading] = useState();
  const [isWorkspaceData, setWorkspaceData] = useState();
  const [isWorkspaceDataError, setWorkspaceDataError] = useState();

  const getWorkspaceData = async () => {
    try {
      setWorkspaceDataLoading(true)
      setWorkspaceDataError(null)
      const res = await axios.get("https://clickups-server.onrender.com/api/ws1/workspaceData");
      // const res = await axios.get("http://localhost:5000/api/ws1/workspaceData");
      console.log(res)
      if (res.status === 200) {
        setWorkspaceDataLoading(false)
        console.log("workspaceData: ", res);
        setWorkspaceData(res.data)
      }
    } catch (err) {
      setWorkspaceDataLoading(false)
      setWorkspaceDataError(err);
      console.log("error: ", err)

      return err;
    }

  }

  return { isWorkspaceDataError, isWorkspaceDataLoading, isWorkspaceData, getWorkspaceData }
}


