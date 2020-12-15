import axios from "axios";

// THIS IS AN EXAMPLE THAT YOU CAN USE
// TO CREATE A SERVICE FOR YOUR AXIOS CALLS
class RecordService {
  constructor() {
    // this.api  is a reusable base of the request containing the base url (baseURL)
    // of the API and the options ( `withCredentials: true` )
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL+"/api",
      withCredentials: true,
    });
  }

  getAll = () => {
    const pr = this.api.get("/records");
    return pr;
  };

  getOneUser = (id) => {
    const pr = this.api.get(`/users/${id}`).then((apiResponse) => {
      return apiResponse.data;
    });
    return pr;
  };

  getOne = (id) => {
    const pr = this.api.get(`/records/${id}`).then((apiResponse) => {
      return apiResponse.data;
    });
    return pr;
  };

  create = (data) => {
    const pr = this.api.post(`/records`, data);
    return pr;
  };

  /* updateOneRecord = (id) => {
  const pr = this.api.put(`/records/${id}`);
  return pr;
}
 */
  /* updateOneUser = (id) => {
  const pr = this.api.put(`/users/${id}`);
  return pr;
} */

  updateFave = (userId, recordId) => {
    const pr = this.api.put(`/users/${userId}/records/${recordId}`);
    return pr;
  };

  removeFave = (recordId, userId) => {
    const pr = this.api.put(`/records/${recordId}/users/${userId}`);
    return pr;
  };



  deleteOne = (id) => {
    const pr = this.api.delete(`/records/${id}`);
    return pr;
  };
}

// Create instance (object) containing all axios calls as methods
const recordService = new RecordService();

export default recordService;

// Service is a set of methods abstracted and placed into a class, out of which we create one instance.
// In the above case, all axios request calls are abstracted into methods.
