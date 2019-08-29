export const addName_action = (name) => ({
    type: "TEST1",
    data: name
});
export const addAge_action = (age) => ({
    type: "TEST2",
    data: age
});
export const addInfo_action = (name, age) => ({
    type: "TEST3",
    data: {
        name,
        age
    }
});