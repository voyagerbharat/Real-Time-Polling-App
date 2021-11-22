const form = document.getElementById("vote-form");

//form submission
form.addEventListener("submit", (e) => {
  const choice = document.querySelector("input[name=os]:checked").value;
  const data = { os: choice };
  console.log(data);
  fetch("http://localhost:3001/poll", {
    method: "post",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  e.preventDefault();
});

fetch("http://localhost:3001/poll")
  .then((res) => res.json())
  .then((data) => {
    const votes = data;
    const totalVotes = votes.length;

    const voteCounts = votes.reduce(
      (acc, vote) => (
        (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc
      ),
      {}
    );

    let dataPoints = [
      { label: "Windows", y: voteCounts.Windows },
      { label: "MacOs", y: voteCounts.MacOs },
      { label: "Linux", y: voteCounts.Linux },
      { label: "Others", y: voteCounts.Others },
    ];

    const chartContiner = document.querySelector("#chartContainer");

    if (chartContiner) {
      const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "theme3",
        title: {
          text: `Total Votes ${totalVotes}`,
        },
        data: [
          {
            type: "column",
            dataPoints: dataPoints,
          },
        ],
      });
      chart.render();

      //enable pusher logging

      var pusher = new Pusher("2d385fb1fc4888ca2b57", {
        cluster: "ap2",
      });

      var channel = pusher.subscribe("os-poll");
      channel.bind("os-vote", function (data) {
        dataPoints = dataPoints.map((x) => {
          if (x.label == data.os) {
            x.y += data.points;
            return x;
          } else {
            return x;
          }
        });
        chart.render();
      });
    }
  });
