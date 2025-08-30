import { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import axios from 'axios'
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext()
export const AppContextProvider = (props) => {
    const backendurl = import.meta.env.VITE_BACKEND_URL  //“Load my backend API URL from environment variables defined in the frontend’s .env file
    const { user } = useUser()
    const { getToken } = useAuth()
    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    })
    const [isSearched, setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)
    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)
    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])

    //Function to fetch job data
    const fetchjobs = async () => {
        try {
            const { data } = await axios.get(backendurl + '/api/jobs')
            if (data.success) {
                setJobs(data.jobs)
                console.log(data.jobs);
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    //function to fetch company data
    const fetchCompayData = async () => {
        try {
            const { data } = await axios.get(backendurl + '/api/company/company', { headers: { token: companyToken } })
            if (data.success) {
                setCompanyData(data.company)
                console.log(data);

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }
    //function to fetch user data
    const fetchUserData = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get(backendurl + '/api/users/user',
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (data.success) {
                setUserData(data.user)

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchjobs()
        const storedCompanyToken = localStorage.getItem('companyToken')
        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken)
        }
    }, [])

    useEffect(() => {
        if (companyToken) {
            fetchCompayData()
        }
    }, [companyToken])
    useEffect(()=>{
        if(user){
            fetchUserData()
        }
    },[user])
    const value = {
        setSearchFilter, searchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendurl

    }

    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}

