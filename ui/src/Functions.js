import axios from "axios";

export const getClient = () => {
  return axios
    .get("gestion/contact/", {
      headers: { "Content-type": "application/json" },
    })
    .then((res) => {
      var data = [];
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key];
        data.push([
          val.id,
          val.first_name,
          val.last_name,
          val.phone_number,
          val.email,
        ]);
      });

      return data;
    });
};

export const addClient = (term) => {
  return axios
    .post(
      "gestion/contact/",
      {
        first_name: term[0],
        last_name: term[1],
        email: term[2],
        phone_number: term[3],
      },
      {
        headers: { "Content-type": "application/json" },
      }
    )
    .then((res) => {
      console.log(res);
    });
};

export const deleteClient = (term) => {
  axios
    .delete(`gestion/contact/${term}`, {
      headers: { "Content-type": "application/json" },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((res) => {
      console.log(res);
    });
};

export const nextClient = (term) => {
  return axios
    .get(`gestion/contact/${term}`, {
      headers: { "Content-type": "application/json" },
    })
    .then((res) => {
      var data = [];
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key];
        data.push([
          val.id,
          val.first_name,
          val.last_name,
          val.phone_number,
          val.email,
          val.siren_number,
          val.society_naame,
        ]);
      });

      return data;
    });
};

export const updateClient = (term, id) => {
  return axios
    .put(
      `gestion/contact/${id}`,
      {
        siren_number: term,
      },
      {
        headers: { "Content-type": "application/json" },
      }
    )
    .then((res) => {
      console.log(res);
    });
};


export const updateSocietyName = (id) => {
  return axios
    .post(
      `scrape/${id}`,
      {
        headers: { "Content-type": "application/json" },
      }
    )
    .then((res) => {
      console.log(res);
    });
};

export const sendMail = (id) => {
  return axios
    .post(
      `send/${id}`,
      {
        headers: { "Content-type": "application/json" },
      }
    )
    .then((res) => {
      console.log(res);
    });
};