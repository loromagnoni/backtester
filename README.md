# Architecture proposal - App&Domain

The aim of this repository is to showcase a potential way to build scalable web applications. From a high level point of view, elements are divided between domain logic and app specific ones. A more detailed description follows.

## About the project

The application is a visualizer of financial information in the form of a candlestick chart. The user can choose between multiple assets, change the timeframe, change the date. It is also possible to start a replay, which will make the chart move as it did in the past. The user can also change the speed at which the simulation is replaying.
If asset data is not available, an error toast is displayed to the user.

## About the architecture

Let's see how the application is built, which are the principles and rules applied.

### Folder structure

Here is an overview of what the structure looks like.

```
src/
	app/
		dependencies/
		domain/
		tree/
	dependencies/
		managers/
		repositories/
		state/
	domain/
		dependencies/
			managers/
			repositories/
			state/
		models/
		useCase/
	test/
		app/
		useCase/
```

#### Let's dive.

```
src/
	app/
	dependencies/
	domain/
```

---

The **app** folder contains the application layer elements. For example in this case, it contains the React application. In fact, React is imported **only** inside the app folder. We could easily move the project in a CLI app or mobile app, since the only files to change would be inside the **app** folder. Of course in reality this never happens, the main reasons to encapsulate the application layer logic in a specific folder is:

- **Reduce mental burden when building features**, by applying the divide-et-impera principle. For each feature to implement, it can be divided in elements that are application dependent - React components - or domain dependent - high level rules. Then both implementations can be addressed separately, as the architecture explicitly decouples them.
- **Improve developer experience while testing**, reducing the impact of complex application behavior, in React case, component renders, effects and reactivity in general, which is cumbersome to correctly test and integrate in a testing environment. Everything that is outside the **app** folder is just plain javascript, far more easier to test.

---

The **domain** folder contains the business logic elements. All the processes that update the state of the application, rules that transform and map domain entities are inside here. A business logic rule is represented by a _use case_. Some examples based on this repository are:

- Change asset
- Get selected asset
- Toggle replay activation
- Reset chart

Each use case can have some dependencies. Other use cases can be dependencies too. But note! All the dependencies defined in the use case are just interfaces. In this way, each rule is completely decoupled from everything else, and can exists on its own.
Inside the domain folder are defined both the models of entities and of dependencies, always only with interfaces. Moreover, the **domain** folder does not import anything outside of it.
Using this approach, everything inside this folder is extremely easy to test, and looking at the content is clear what the user can do with in the project domain.

---

The **dependencies** folder contains the concrete implementation of the use cases dependencies. Elements inside this folder can only import definition coming from the domain. In this way, also these ones will be just plain javascript entities, easy to test and understand.

---

Now that you have an high level idea of the different concepts: app, domain and dependencies,

#### let's go deeper.

```
app/
	dependencies/
	domain/
	tree/
```

Inside the **app** folder we can find

- The domain adapters inside the **app/domain** folder. There are elements that enable to use the abstract use cases with the concrete dependencies, connecting them with the state of the application. In this case, being a React application, they are hooks wrapping use cases functions. NOTE: this logic is extremely trivial, at the point that it could be possible to easily generate all the content of this folder automatically!
- The elements available in the render tree under the **app/tree** folder. Here is possible to navigate the elements as they appear inside the render tree. In this way is super clear which will be the runtime structure of the application, and what the user will see even before launching it.
- The injector of concrete dependencies defined in **app/dependencies**, in React environment the dependency context and provider definition.

The **app/tree** folder can only import files coming from the **app/domain** or **app/dependencies** .
**app/domain** cannot import files inside **app/tree**.

```
domain/
	dependencies/
		managers/
		repositories/
		state/
	models/
	useCase/
```

The domain logic can be split across

- **models**. Plain interfaces which define domain entities.
- **managers**. Dependencies which represent high level interfaces used to interact with entities which require side-effect rich logic. Examples in this repository are:
  - _Chart Manager_. Used as interface to interact with the library which manage the candlestick chart.
  - _Replay Manager_. Used as interface to interact with timers.
  - _Message Manager_. Used as interface to interact with toasts.
- **repositories**. Dependencies which represent high level interfaces used to interact with entities which handle the storage and retrieval of information. Example in this repository are:
  - _Asset Repository_. Used to gather assets information
  - _Timeframe Repository_. Used to gather timeframes information.
  - _Velocity Repository_. Used to gather velocity information.
- **state**. From the domain POV, the state is just another dependency. Here resides the interface that reperesent its model.
- **useCase**. Finally, the collection of use cases, divided by sub domain. Each use case represent the business logic which glues all the dependencies together.

```
dependencies/
	managers/
	repositories/
	state/
```

The **dependencies** folder resembles the structure of the **domain/dependencies** one, each file concretely implements the corresponding interface.

### Boundaries

Great to have you still here! Now you should have a quite deep understanding on the project structure.
Let's list some rules that represent better the dynamic between the pillars outlined.

- The **domain** folder do not import anything outside of it.
- The **domain/models** folder do not import anything outside of it.
- The **domain/dependencies** folder can only import from **domain/models**.
- The **dependencies** folder do not import anything from **app**.
- The **dependencies** folder do not import any use case from **domain/useCase**.
- The **app/domain** folder imports only from the **domain/useCase** and **app/dependencies**.
- The **app/dependencies** folder imports only from **domain/dependencies** and **domain/models**.
- The **app/tree** folder imports only from the **app/domain** and **domain/models** folders.
  Here is a visualization.

![alt text](https://github.com/[username]/[reponame]/blob/[branch]/image.jpg?raw=true)

You can find a generable one in the ` dependencygraph.svg` file, create one new with `yarn architecture`.
