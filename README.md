# Instructions:

To run the program, the following steps must be performed:

1) Download the contents of the repository
2) Execute the command ```npm install```.
3) Execute the command ```npm run tsc```.
4) Execute the command ```node build/index.js```.


To use the program it will ask you to enter the information of the 3 satellites. The information per satellite is as follows:

1) Enter distance of the message: (You must enter the distance of the message with the satellite, example: 100 or 100.5). You must press the "Enter" key

2) Enter one word of the message: (You must enter one word of the message received, i.e. you must enter word by word, e.g.: this, [empty], etc). Press the "Enter" key

2.5) After entering a word you will see the following message:
- If you want add other word press Y or N to continue (Y/N): (You must press the "Y" key every time you want to add a new word or if the message is finished you must press the "N" key).

3) After entering all the information, the corresponding calculation of the position and the obtained message will be made.

If the information cannot be obtained, the following message will be displayed:

- There is not enough information
