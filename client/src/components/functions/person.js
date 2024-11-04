import axios from "axios";

export const createPerson = async (fromData, authToken) => {
  if (!fromData || !authToken) {
    throw new Error("Missing required fields: name and authToken");
  }

  const url = `${process.env.REACT_APP_API}/createPerson`;
  const data = fromData ;
  const headers = { authToken };
  try {
    const response = await axios.post(url, data, { headers });

    return response.data;
  } catch (error) {
    console.error("Error creating person:", error);
    throw new Error("[API Error]ไม่สามารถส่งข้อมูลไปบันทึกได้");
  }
};

export const getPerson = async (id, authToken) => {
  if (!id || !authToken) {
    throw new Error("Missing required fields: name and authToken");
  }

  const url = `${process.env.REACT_APP_API}/person/${id}`;
  const headers = { authToken };

  try {
    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.error("Error creating person:", error);
    throw new Error("[API Error]ไม่สามารถส่งข้อมูลไปบันทึกได้");
  }
};

export const listAll_Product = async (authToken) => { // ค้นหาข้อมูล ผลรวม group count ทั้งหมด
  if (!authToken) {

    throw new Error("Missing required fields: name and authToken");
  }
  const url = `${process.env.REACT_APP_API}/listAllProduct`;

  const headers = { authToken };

  try {
    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.error("Error creating person:", error);
    throw new Error("[API Error]ไม่สามารถส่งข้อมูลไปบันทึกได้");
  }
};

export const listPerson = async (authToken,group) => {
  if (!authToken) {
    throw new Error("Missing required fields: name and authToken");
  }
  const url = `${process.env.REACT_APP_API}/person`;

  const headers = { authToken };
  const data = {group:group}

  try {
    const response = await axios.post(url,data, { headers });

    return response.data;
  } catch (error) {
    console.error("Error creating person:", error);
    throw new Error("[API Error]ไม่สามารถส่งข้อมูลไปบันทึกได้");
  }
};

export const removePerson = async (id, authToken) => {
  if (!id || !authToken) {
    throw new Error("Missing required fields: name and authToken");
  }

  const url = `${process.env.REACT_APP_API}/person/${id}`;
  const headers = { authToken };

  try {
    const response = await axios.delete(url, { headers });

    return response.data;
  } catch (error) {
    console.error("Error creating person:", error);
    throw new Error("[API Error]ไม่สามารถส่งข้อมูลไปบันทึกได้");
  }
};

export const updatePerson = async (fromData,id, authToken) => {
  if (!id || !authToken) {
    throw new Error("Missing required fields: name and authToken");
  }

  const url = `${process.env.REACT_APP_API}/person/${id}`;
  const data = fromData ;
  const headers = { authToken };

  try {
    const response = await axios.put(url,data, { headers });

    return response.data;
  } catch (error) {
    console.error("Error creating person:", error);
    throw new Error("[API Error]ไม่สามารถส่งข้อมูลไปบันทึกได้");
  }
};


