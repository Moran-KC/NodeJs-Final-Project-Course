//GET
async function getAll() {
    let body = await (await (fetch("/api/info"))).json();
    let strOption = ``;
    let strTable = `
    <tr>
        <th>Domain</th>
        <th>Web page</th>
        <th>Name</th>
        <th>Counter</th>
        <th>Add student</th>
    </tr>
    `;

    for (let school of body) {
        strOption += `<option>${school.name}</option>`;
        strTable += `
        <tr>
            <td>${school.domain}</td>
            <td>${school.web_page}</td>
            <td>${school.name}</td>
            <td>${school.counter}</td>
            <td><button value="${school.name}" onclick="AddStudentToSchool(event)">Register</button></td>
        </tr>
        `;
    }
    document.getElementById("schoolTable").innerHTML = strTable;
    document.getElementById("schoolList").innerHTML = strOption;

}
//POST
async function addNewSchool() {

    let domain = document.getElementById("AddDomain").value;
    let webpage = document.getElementById("AddWeb_page").value;
    let name = document.getElementById("AddName").value;

    let initParam = {
        "method": "POST",
        headers: { "Content-Type": "application/json" },
        body: `{"domain":"${domain}","web_page":"${webpage}","name":"${name}","counter":${0}}`
    };

    let res = await (fetch(`/api/add`, initParam));
    console.log(res.status);
    getAll();
}

//PUT
async function AddStudentToSchool(e) {

    let name = e.target.value;

    let initParam = {
        "method": "PUT",
        headers: { "Content-Type": "application/json" },
        body: `{"name":"${name}"}`
    };

    let res = await (fetch(`/api/edit/${name}`, initParam));

    alert((res.status == 400) ? "Rgistration Faild" : "Rgistration Completed!");

    getAll();

}

//DELETE
async function deleteSchool() {
    let name = document.getElementById("schoolList").value;

    let res = await (fetch(`/delete/${name}`, { "method": "DELETE" }));
    console.log(res.status);
    getAll();
}