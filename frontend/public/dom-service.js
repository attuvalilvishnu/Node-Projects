class DomService {
    createUserBoxElement(appBaseUrl, user) {
        const boxWrapper = document.getElementById('box-wrapper');
        const ele = ` 
        <div class='col-sm-5  user-box'>
            <div>
                <div><img src='${appBaseUrl}/images/default-user.jpg'></div>
                <div class='name'>${user.firstName} ${user.lastName}</div> 
                <i  id='${user._id}' class=" fa fa-edit fa-2x" ></i>
                <i id='${user._id}' class="fa fa-trash fa-2x" ></i>
            </div>              
        </div>`;
        boxWrapper.innerHTML += ele;
    }

    createSaveElements({ appBaseUrl, parentDiv, firstName, lastName, _id }) {
        parentDiv.innerHTML = '';
        const ele =
            `<div>
                <div><img src='${appBaseUrl}/images/default-user.jpg'></div>
                <div class='name'>
                    <input class='edit_fname' type='text' value='${firstName}'> 
                    <input class='edit_lname' type='text' value='${lastName}'>
                </div> 
                <i id='${_id}' class="fa fa-save fa-2x" ></i>
            </div>`;
        parentDiv.innerHTML = ele;
    }

    createEditElements({ appBaseUrl, parentDiv, firstName, lastName, _id }) {
        parentDiv.innerHTML = '';
        const ele = `<div>
        <div><img src='${appBaseUrl}/images/default-user.jpg'></div>
        <div class='name'>${firstName} ${lastName}</div> 
        <i  id='${_id}' class=" fa fa-edit fa-2x" ></i>
        <i id='${_id}' class="fa fa-trash fa-2x" ></i>
    </div>`;
        parentDiv.innerHTML = ele;
    }

}

export default DomService