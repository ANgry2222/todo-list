import "@testing-library/jest-dom";
import { screen, render, act } from "@testing-library/react";
import { Provider } from "react-redux";
import TaskList from "@/app/components/TaskList/TaskList";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer, {
	addItem,
	changeItemStatus,
	clearCompletedTasks,
} from "../src/app/store/slices/todoSlice";
import menuButtonReducer, {
	setActiveButton,
} from "../src/app/store/slices/menuButtonSlice";
import TodoTaskStyles from "../src/app/components/TodoTask/TodoTask.module.scss";

jest.mock("nanoid", () => ({ nanoid: () => "test-id" })); //решение конфликта с библиотекой генерации уникальных id

describe("Тест функциональности компонента списка и поведения интерфейса", () => {
	test("Тест пустого списка", () => {
		const testText = "Задача";

		const store = configureStore({
			reducer: { todos: todoReducer, menuButton: menuButtonReducer },
			preloadedState: {
				todos: {
					items: [],
				},
				menuButton: { activeButton: 1 },
			},
		});

		render(
			<Provider store={store}>
				<TaskList />
			</Provider>
		);

		expect(screen.getByTestId("task-list-placeholder")).toBeInTheDocument();
	});

	test("Тест списка из одного элемента", () => {
		const testText = "Задача";

		const store = configureStore({
			reducer: { todos: todoReducer, menuButton: menuButtonReducer },
			preloadedState: {
				todos: {
					items: [{ id: "id1", text: testText, isCompleted: false }],
				},
				menuButton: { activeButton: 1 },
			},
		});

		render(
			<Provider store={store}>
				<TaskList />
			</Provider>
		);

		expect(screen.getByTestId("task-list").childElementCount).toEqual(1);
		expect(
			screen.queryByTestId("task-list-placeholder")
		).not.toBeInTheDocument();
	});

	test("Тест на добавление элемента в список", () => {
		const testText = "Задача";
		const addedElementText = "Новая задача";

		const store = configureStore({
			reducer: { todos: todoReducer, menuButton: menuButtonReducer },
			preloadedState: {
				todos: {
					items: [{ id: "id1", text: testText, isCompleted: false }],
				},
				menuButton: { activeButton: 1 },
			},
		});

		render(
			<Provider store={store}>
				<TaskList />
			</Provider>
		);

		act(() => {
			store.dispatch(addItem(addedElementText));
		});

		expect(screen.getByTestId("task-list").childElementCount).toEqual(2);
		expect(screen.getByTestId("task-list").lastChild?.textContent).toEqual(
			addedElementText
		);
		expect(
			screen.queryByTestId("task-list-placeholder")
		).not.toBeInTheDocument();
	});

	test("Тест на изменение статуса задачи на выполненный", () => {
		const testText = "Задача";
		const uid = "unique_element_id";

		const store = configureStore({
			reducer: { todos: todoReducer, menuButton: menuButtonReducer },
			preloadedState: {
				todos: {
					items: [
						{ id: "id1", text: testText, isCompleted: false },
						{ id: "id2", text: testText, isCompleted: false },
						{ id: uid, text: testText, isCompleted: false },
					],
				},
				menuButton: { activeButton: 1 },
			},
		});

		render(
			<Provider store={store}>
				<TaskList />
			</Provider>
		);

		act(() => {
			store.dispatch(changeItemStatus(uid));
		});

		expect(screen.getByTestId("task-list").childElementCount).toEqual(3);
		expect(
			screen.queryByTestId("task-list-placeholder")
		).not.toBeInTheDocument();
		expect(screen.getByTestId("task-list").lastChild).toHaveClass(
			TodoTaskStyles.completed_task
		);
		expect(screen.queryByTestId("check-mark")).toBeInTheDocument();
		expect(
			screen.getByTestId("task-list").lastChild?.firstChild
		).toBeInTheDocument();
	});

	test("Тест на изменение статуса задачи на невыполненный", () => {
		const testText = "Задача";
		const uid = "unique_element_id";

		const store = configureStore({
			reducer: { todos: todoReducer, menuButton: menuButtonReducer },
			preloadedState: {
				todos: {
					items: [
						{ id: "id1", text: testText, isCompleted: false },
						{ id: "id2", text: testText, isCompleted: false },
						{ id: uid, text: testText, isCompleted: true },
					],
				},
				menuButton: { activeButton: 1 },
			},
		});

		render(
			<Provider store={store}>
				<TaskList />
			</Provider>
		);

		act(() => {
			store.dispatch(changeItemStatus(uid));
		});

		expect(screen.getByTestId("task-list").childElementCount).toEqual(3);
		expect(
			screen.queryByTestId("task-list-placeholder")
		).not.toBeInTheDocument();
		expect(screen.getByTestId("task-list").lastChild).not.toHaveClass(
			TodoTaskStyles.completed_task
		);
		expect(screen.queryByTestId("check-mark")).not.toBeInTheDocument();
	});

	test("Тест на удаление выполненных задач из списка", () => {
		const deletedTaskText = "to delete";
		const keptTaskText = "to keep";

		const store = configureStore({
			reducer: { todos: todoReducer, menuButton: menuButtonReducer },
			preloadedState: {
				todos: {
					items: [
						{
							id: "id1",
							text: deletedTaskText,
							isCompleted: false,
						},
						{ id: "id2", text: keptTaskText, isCompleted: false },
						{
							id: "id3",
							text: deletedTaskText,
							isCompleted: false,
						},
						{ id: "id4", text: keptTaskText, isCompleted: false },
						{
							id: "id5",
							text: deletedTaskText,
							isCompleted: false,
						},
					],
				},
				menuButton: { activeButton: 1 },
			},
		});

		render(
			<Provider store={store}>
				<TaskList />
			</Provider>
		);

		act(() => {
			store.dispatch(changeItemStatus("id1"));
			store.dispatch(changeItemStatus("id3"));
			store.dispatch(changeItemStatus("id5"));

			store.dispatch(clearCompletedTasks());
		});

		expect(screen.getByTestId("task-list").childElementCount).toEqual(2);
		expect(
			screen.queryByTestId("task-list-placeholder")
		).not.toBeInTheDocument();

		expect(screen.getByTestId("task-list").firstChild?.textContent).toEqual(
			keptTaskText
		);
		expect(screen.getByTestId("task-list").lastChild?.textContent).toEqual(
			keptTaskText
		);
	});

	test("Тест фильтрации только выполненных задач", () => {
		const deletedTaskText = "to delete";
		const keptTaskText = "to keep";

		const store = configureStore({
			reducer: { todos: todoReducer, menuButton: menuButtonReducer },
			preloadedState: {
				todos: {
					items: [
						{
							id: "id1",
							text: deletedTaskText,
							isCompleted: true,
						},
						{ id: "id2", text: keptTaskText, isCompleted: false },
						{
							id: "id3",
							text: deletedTaskText,
							isCompleted: true,
						},
						{ id: "id4", text: keptTaskText, isCompleted: false },
						{
							id: "id5",
							text: deletedTaskText,
							isCompleted: true,
						},
					],
				},
				menuButton: { activeButton: 1 },
			},
		});

		render(
			<Provider store={store}>
				<TaskList />
			</Provider>
		);

		act(() => {
			store.dispatch(setActiveButton(1));
		});

		expect(screen.queryAllByText(keptTaskText).length).toEqual(2);
		expect(screen.queryAllByText(deletedTaskText).length).toEqual(3);

		act(() => {
			store.dispatch(setActiveButton(2));
		});

		expect(screen.queryAllByText(keptTaskText).length).toEqual(2);
		expect(screen.queryAllByText(deletedTaskText).length).toEqual(0);

		act(() => {
			store.dispatch(setActiveButton(3));
		});

		expect(screen.queryAllByText(keptTaskText).length).toEqual(0);
		expect(screen.queryAllByText(deletedTaskText).length).toEqual(3);
	});
});
