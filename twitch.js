const channels = ['riotgames', 'freecodecamp', 'puppers', 'nugiyen', 'tru3ta1ent', 'mathil1'];
let data = []; // [name: '', logo: '', status: '', url: '', game: '']

const url = (type, channel) => (`https://wind-bow.gomix.me/twitch-api/${type}/${channel}?callback=?`);

const fetchChannelData = (channel) => (
  $.getJSON(url('channels', channel), response => {
    //console.log('channel', response);
    data.push({
      name: response.name,
      logo: response.logo,
      game: response.game,
      status: response.status,
      url: response.url,
      display: response.display_name,
      id: response._id,
      stream: '',
      status: '',
    })

  })
); // ..rest
const fetchStreamData = (channel) => (
  $.getJSON(url('streams', channel), response => {
    console.log('streams', response);
    //filter through stream for live responses
    const objIndex = data.findIndex(obj => obj.name.toLowerCase() === channel.toLowerCase());

    // console.log(2, response.stream.channel.status);

    response.stream === null ? data[objIndex].stream = "Offline" : data[objIndex].stream = "Online";

    if (data[objIndex].stream === "Online") {
      console.log(5, data[objIndex].status);
      data[objIndex].status = response.stream.channel.status;
      console.log(6, data[objIndex].status);
    }

    if(channel === channels[channels.length - 1]){
         displayData(data);
      }
    })
); // stream_type

 const fetchData = () => {
   channels.forEach(async channel => {
                    await fetchChannelData(channel);
                    fetchStreamData(channel);
     });
 };


$('#all').on('click', () => {
  $('#content').empty();
  (displayData(data));
});
$('#online').on('click', () => {
  $('#content').empty();
  (displayData(data.filter(online => online.stream == "Online")));
});

$('#offline').on('click', () => {
  $('#content').empty();
  (displayData(data.filter(offline => offline.stream == "Offline")));
});

// const handleSearch = (value) => ();

const displayData = (data) => {
  console.log('data', data)
  $('#content').empty();

  data.forEach(item => $('#content').append(`<a href="https://www.twitch.tv/${item.name}" target="_blank">
<div class="streamers row">
  <div class="col-sm-2"><img class="icon" src=${item.logo}></div>
  <div class="col-sm-4">${item.display}</div>
  <div class="col-sm-5">${item.status ? item.status : item.stream}</div>
</div>`));
};

const header = document.getElementById("btnDIV");
const btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    const current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

( () => {
  fetchData();
})();
