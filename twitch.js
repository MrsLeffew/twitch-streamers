const channels = ['riotgames', 'freecodecamp', 'puppers', 'nugiyen', 'tru3ta1ent'];
let data = [];

const url = (type, channel) => (`https://wind-bow.gomix.me/twitch-api/${type}/${channel}?callback=?`);

const fetchChannelData = (channel) => (
  $.getJSON(url('channels', channel), response => {
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
);

const fetchStreamData = (channel) => (
  $.getJSON(url('streams', channel), response => {
    console.log('streams', response);
    //filter through stream for live responses
    const objIndex = data.findIndex(obj => obj.name.toLowerCase() === channel.toLowerCase());

    response.stream === null ? data[objIndex].stream = "Offline" : data[objIndex].stream = "Online";

    if (data.stream === "Online") {
      data.status = response.stream.channel.status;
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
  (displayData(data));
  showColor();
});
$('#online').on('click', () => {
  (displayData(data.filter(online => online.stream == "Online")));
  showColor();
});

$('#offline').on('click', () => {
  (displayData(data.filter(offline => offline.stream == "Offline")));
  showColor();
});

// const handleSearch = (value) => ();

const displayData = (data) => {
  console.log('data', data)
  $('#content').empty();
  data.forEach(item => $('#content').append(`<a href="${item.url}" target="_blank"> <div class="streamers"><img class="icon" src=${item.logo}> ${item.display} ${item.game} ${item.stream}</div>`));
};

const showColor = () => {
  $('#all').toggleClass('color');
  $('#online').toggleClass('color');
  $('#offline').toggleClass('color');

};

( () => {
  fetchData();
})();
