(async () => {

    const response = await fetch('http://localhost:3000/api/users');
    const resp = await response.json();
    console.log(resp);

    const boxWrapper = document.getElementById('box-wrapper');
    resp.forEach((res) => {
        const ele = ` 
        <div class='col-sm-5  user-box'>
            <div>
                <div><img src='http://localhost:5000/images/default-user.jpg'></div>
                <div class='name'>${res.firstName} ${res.lastName}</div> 
                <i class="fa fa-edit fa-2x" ></i>
                <i class="fa fa-trash fa-2x" ></i>
            </div>              
        </div>`;
        boxWrapper.innerHTML += ele;

    });

})();