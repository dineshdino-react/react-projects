
const getDoctorID = async () => {
    const [doctorID,setdoctorID] = useState('');
    try {
      const token = await AsyncStorage.getItem('authtoken');
      if (token) {
        const response = await axios.get(`${API_SERVER_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        console.log('Doctor ID:', response.data.doctorID);
        const userData = response.data;
        const doctorID = response.data.doctorID;
        if (userData && userData.doctorID) {
          setdoctorID({...doctorID, doctorID: userData.doctorID});
        }
      }
    } catch (error) {
      console.error('Error getting doctorID from token:', error);
    }
  };
  useEffect(() => {
    getDoctorID();
  }, []);
  export default getDoctorID