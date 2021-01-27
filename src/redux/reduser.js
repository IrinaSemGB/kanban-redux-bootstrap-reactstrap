import faker from "faker";

const statuses = ["Todo", "Progress", "Review", "Done"];
const priorities = [1, 2, 3];

const initialState = {
    tasks: [
        {
            id: Math.random(),
            name: faker.random.words(5),
            description: faker.random.words(10),
            status: statuses[0],
            priority: priorities[0]
        },
        {
            id: Math.random(),
            name: faker.random.words(5),
            description: faker.random.words(10),
            status: statuses[1],
            priority: priorities[0]
        },
        {
            id: Math.random(),
            name: faker.random.words(5),
            description: faker.random.words(10),
            status: statuses[2],
            priority: priorities[0]
        },
        {
            id: Math.random(),
            name: faker.random.words(5),
            description: faker.random.words(10),
            status: statuses[3],
            priority: priorities[0]
        },
    ],

    statuses: ["Todo", "Progress", "Review", "Done"],
    priorities: [1, 2, 3]
}

const kanban = (state = initialState, action) => {
    switch (action.type) {

        case 'DELETE':
            const deletedTasks = state.tasks.filter(el => el.id !== action.payload.id);
            return {...state, tasks: deletedTasks};

        case 'LEFT':
            function  previousStatus(currentStatus) {
                return statuses[statuses.indexOf(currentStatus) - 1];
            }
            const leftUpdatedTasks = state.tasks.map(el => el.id === action.payload.id ? {...el, status: previousStatus(el.status)} : el);
            return {...state, tasks: leftUpdatedTasks};

        case 'RIGHT':
            function  nextStatus(currentStatus) {
                return statuses[statuses.indexOf(currentStatus) + 1];
            }
            const rightUpdatedTasks = state.tasks.map(el => el.id === action.payload.id ? {...el, status: nextStatus(el.status)} : el);
            return {...state, tasks: rightUpdatedTasks};

        case 'PRIORITY_DOWN':
            function  previousPriority(currentPriority) {
                return priorities[priorities.indexOf(currentPriority) - 1];
            }
            const limitMin = Math.min(...priorities);
            const priorityDownUpdatedTasks = state.tasks.map(el =>
                (el.id === action.payload.id && action.payload.currentPriority > limitMin
                    ? {...el, priority: previousPriority(el.priority)}
                    : el));
            return {...state, tasks: priorityDownUpdatedTasks};

        case 'PRIORITY_UP':
            function  nextPriority(currentPriority) {
                return priorities[priorities.indexOf(currentPriority) + 1];
            }
            const limitMax = Math.max(...priorities);
            const priorityUpUpdatedTasks = state.tasks.map(el => {
                if (el.id === action.payload.id && action.payload.currentPriority < limitMax) {
                    return {...el, priority: nextPriority(el.priority)};
                } else {
                    return el;
                }
            });
            return {...state, tasks: priorityUpUpdatedTasks};

        case 'CREATE_TASK':
            const createdNewTask = [...state.tasks, action.payload.newTask];
            return {...state, tasks: createdNewTask};

        case 'UPDATE_TASK':
            const updatedTask = action.payload.updatedTask;
            const updatedTasks = state.tasks.map(el => {
                        if (el.id === updatedTask.id) return {...el, name: updatedTask.name,
                                                                     description: updatedTask.description,
                                                                     status: updatedTask.status,
                                                                     priority: updatedTask.priority};
                        return el;
                    });
            return {...state, tasks: updatedTasks};

        default:
            return state;
    }
};

export default kanban;