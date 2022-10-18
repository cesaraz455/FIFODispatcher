export default class Dispatcher {

    constructor(table, addButton){
        this.table = table;
        this.addButton = addButton;
        this.processes = [];
        this.processID = 0;
        this.executingProcess = false;
    }

    init(){
        this.startMirror();
        this.addButton.on('click', () => {
            this.addProcess();
        });
    }

    startMirror(){
        setInterval(() => {
            if(!this.executingProcess){
                let processesFiltered = this.processes.filter((process) => process.status == "En espera")
                if(processesFiltered.length > 0){
                    let process = processesFiltered[0];
                    if(process.status != "Terminado" && process.status != "Rechazado"){
                        this.executingProcess = true;
                        process.status = "Ejecución"
                        this.renderTable();
                        setTimeout(() => {
                            this.executingProcess = false;
                            process.status = "Terminado"
                            this.renderTable();
                        }, process.time * 1000);
                    }
                }
            }
        }, 100);
    }

    addProcess(){
        this.processID++;
        if(this.processID <= 26){
            this.processes.push({
                processID: this.processID,
                name: "Proceso " + this.getLetter(this.processID),
                size: this.getRandomInt(1, 1024),
                time: this.getTime(), // Entre 20 y 50 segundos
                status: this.processes.length >= 15 ? "Rechazado" : "En espera"    
            });
            this.renderTable();
        } else {
            alert("No se pueden agregar más procesos...");
        }
    }
    
    renderTable(){
        // Eliminación de contenido de la tabla
        this.table.find("tbody tr").remove();
        // Renderizado individual de la tabla
        let tbody = this.table.find("tbody");
        this.processes.forEach((process) => {
            // Asignación de clase para renderizado de color
            let classStatus = (process.status == "Terminado" ? "bg-green-500" : (process.status == "Ejecución" ? "bg-yellow-500" : (process.status == "Rechazado" ? "bg-red-600" : "bg-gray-400")))
            tbody.append($("<tr>"+
                "<td>" + process.processID + "</td>"+
                "<td>" + process.name + "</td>"+
                "<td>" + process.size + "</td>"+
                "<td>" + process.time + "</td>"+
                "<td class="+ classStatus +">" + process.status + "</td>"+
            "</tr>"));
        });
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    getLetter(index){
        let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        return letters[index - 1];
    }

    getTime(){
        let possibilities = [20,25,30,35,40,45,50];
        return possibilities[this.getRandomInt(0,6)]
    }
}