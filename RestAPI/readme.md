
# RestAPI

### Description
This small rest api sample contains two project. 

* Server - this is an ExpressJS implementation with a 'Cars' route
* Client - This is a ReactJS implementation using React Router, Custom Hooks, Vite, in Typescript


### Screenshots
List
![List screen](https://github.com/MrLuis/test/blob/main/RestAPI/filtered_list.png)
Detail
![Detail screen](https://github.com/MrLuis/test/blob/main/RestAPI/detail.png)

### Todo
- [x] Implement Edit
- [x] Implement Delete
- [x] Save search state (using a custom hook, and storing to localStorage)
- [ ] Upgrade server's typescript engine
- [x] Debounce search to reduce http requests (created a useDebounce custom hook!)
- [x] Add some icons
  - [x] Save and Remove buttons
  - [x] Home (when on detail mode)