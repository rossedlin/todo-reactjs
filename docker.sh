
docker run -it -p 3000:3000 -p 9005:9005 -v "${PWD}":/home/node/app rossedlin/nodejs:14 bash
#docker run -it -p 3000:3000 -p 9005:9005 -v "/c/Ross Edlin/Projects/todo-reactjs:/home/node/app" rossedlin/nodejs:14 bash