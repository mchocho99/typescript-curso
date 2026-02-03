import { STATUS, METHODS } from "./types"
import { addTasks, validateParameter, listTasks, completeTask, deleteTask } from "./tasks"
import { showMessage } from "./util"

const method = process.argv[2]
const parameter = process.argv[3]

switch(method) {
    case METHODS.ADD:
        if (validateParameter(parameter, METHODS.ADD)) {
            addTasks(parameter)
        }
    break
    case METHODS.LIST:
        listTasks()
    break
    case METHODS.COMPLETE:
        if (validateParameter(parameter, METHODS.COMPLETE)) {
            completeTask(parameter)
        }
    break
    case METHODS.DELETE:
        if (validateParameter(parameter, METHODS.DELETE)) {
            deleteTask(parameter)
        }
    break

    default:
        showMessage(STATUS.ERROR, "Debes ingresar un metodo correcto")
    break
}
