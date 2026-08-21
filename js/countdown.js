const fecha=new Date("June 20,2027 15:00:00");

setInterval(()=>{

const ahora=new Date();

const diferencia=fecha-ahora;

const dias=Math.floor(diferencia/86400000);

const horas=Math.floor(diferencia%86400000/3600000);

const minutos=Math.floor(diferencia%3600000/60000);

const segundos=Math.floor(diferencia%60000/1000);

document.getElementById("countdown").innerHTML=`

<h2>

${dias}

</h2>

<h3>

${horas}

</h3>

<h3>

${minutos}

</h3>

<h3>

${segundos}

</h3>

`;

},1000);