
# Assignment 2
## Run Locally

Clone the project

```bash
  git clone https://github.com/NMRayhan/Assignment-2.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  yarn init
```
2nd step - installing Express js in Project
```bash
yarn add express
```

3rd step - installing Dev dependency typescript
```bash
yarn add -D typescript
```
4th step - typescript initialization in project
```bash
tsc --init
```
5th step -file structure create and 
dist folder is outDir and src folder is rootDir in ts config file

7th step
nodemon install in dependency for instantly restart server
```bash
yarn add nodemon
```

8th step
modification package.json file in script
```bash
"scripts":{
		"start-dev" : "nodemon dist/server.js" // basically run js file in outDire
}
```
and run this command for instantly tsc convert to js file 
```bash
tsc -w
```
and instantly server restart using nodemon Start the server
```bash
yarn start-dev
```

or you can follow my notion link for better understan
https://carbonated-basketball-b1c.notion.site/Backend-Project-initialize-db18dac03b02405abe10b9463385fc1e?pvs=4
