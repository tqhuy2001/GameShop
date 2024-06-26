import { useEffect, useState } from "react";

const url = 'http://localhost:8003/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZXhwIjoxNzE5MjQ5MTQ4fQ.tnwgzLbcKtfFsS6Js5VK_AOZ7gkLpUNXqPrNtym4SlQ'

function App() {
  const [data, setData] = useState([])
  const fetchData = {
    method: 'GET',
    headers: {
      'Content-Type': 'application.json',
      'Authorization': 'Bearer ' + token,
    },
  }
  useEffect(() => {
    fetch(url + 'user/get_avatar', fetchData)
    .then(res => res.json())
    .then(data => setData(data))
  }, [])
  const src1 = 'data:image/jpeg;base64,' + data.msg
  return (
    <div className="text-red-500 underline">
      <img src={src1} className="h-[100px] w-[150px]"></img>
    </div>
  );
}

export default App;
