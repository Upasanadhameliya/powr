import $ from 'jquery';

export default function Token(){
var settings = {
    "url": "https://identity.nexar.com/connect/token",
    "method": "POST",
    "timeout": 0,
    "data": {
      "client_id": "8d2b29b4-d8e0-4d5c-a13c-c190c77f1710",
      "client_secret": "fb4391de-565d-43a6-8d61-13bbf90f718a",
      "grant_type": "client_credentials"
    }
  };
  
  $.ajax(settings).done(function (response) {
    localStorage.setItem("token", response.access_token);
  });
}
