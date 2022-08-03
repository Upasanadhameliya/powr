import $ from 'jquery';

export default function Token(){
var settings = {
    "url": "https://identity.nexar.com/connect/token",
    "method": "POST",
    "timeout": 0,
    "data": {
      "client_id": "1030bdf7-6826-4ce4-90cc-49d01a9903ff",
      "client_secret": "d36461d9-2301-4405-a891-990414d74b03",
      "grant_type": "client_credentials"
    }
  };
  
  $.ajax(settings).done(function (response) {
    localStorage.setItem("token", response.access_token);
  });
}
