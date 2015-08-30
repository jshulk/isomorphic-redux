export function createTodo(text){
	return {
		type: "CREATE_TODO",
		text,
		date: Date.now()
	}
}

export function editTodo(id, text){
	return {
		type: "EDIT_TODO",
		text,
		id,
		date: Date.now()
	}
}

export function deleteTodo(id){
	return {
		type: "DELETE_TODO",
		id
	}
}