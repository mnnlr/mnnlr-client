import React, { useState } from 'react'
import { axiosPrivate } from '../../customAxios/authAxios'

// hook for getting all leaves of employees
export default function useGetAllLeaves() {
    const [isGetLeavesLoading, setGetLeavesLoading] = useState(false)
    const [isGetLeavesError, setGetLeavesError] = useState(null)
    const [isGetLeaves, setGetLeaves] = useState(null)

    const callGetLeavesApi = async () => {
        setGetLeavesLoading(true)
        setGetLeavesError(null)
        try {
            const apiRes = await axiosPrivate.get("/leave")

            // console.log(apiRes)
            if (apiRes?.data?.Data?.success) {
                setGetLeaves(apiRes)
                setGetLeavesError(null)
                setGetLeavesLoading(false)
                return apiRes?.data?.Data
            } else {
                setGetLeaves(null)
                setGetLeavesError(apiRes?.data?.Data?.message)
                setGetLeavesLoading(false)
                return apiRes?.data?.Data?.message
            }

        } catch (err) {
            console.log("error while calling callGetLeavesApi: ", err)
            setGetLeavesError(err)
            return err;
        } finally {
            setGetLeavesLoading(false)
        }
    }

    return ({ isGetLeaves, isGetLeavesError, isGetLeavesLoading, callGetLeavesApi })
}
