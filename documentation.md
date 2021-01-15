# Web Applications Development (SWD601) Assessment 2 Report

Author: Elliott Simmonds

Student Code: Q14221128

Hosted site: https://web-dev-assessment-20500.web.app

Git Repo: https://github.com/ElliottSimmonds/server-rack-control-panel

---

## Introduction

This project will act is continuation of the previous project, covering the final stages of the design thinking process. I will develop a fully functional single-page web application using the previously defined requirements to solve the identified issue.

The application will be developed for use at my workplace of Telesoft Technologies, to improve our abilities to control and monitor the systems within the R&D department. This application will provide a comprehensive overview of the installed systems, along with a collection of useful information such as their system details, status, and a list of active users. To do so, I will be using the React web framework, which is an open-source JavaScript library for front-end development, utilized by many successful companies such as Twitter, Facebook and Amazon.

This document will explore my chosen development methodology, the choices I have made during development, along with the issues I have faced, and the steps taken in response. Finally, the developed application will be evaluated against the initial requirements and user feedback.  

## Methodology

I decided to choose Agile as my development methodology. Agile is based on iterative and incremental development, where requirements and solutions evolve in response to change and collaboration (Sewell, 2012). As opposed to more rigid methodologies, Agile is great in unexpected circumstances, such as when a new feature requirement is introduced, or a different approach needs to be used. The flexibility of Agile makes it effective for projects of all sizes. Small projects in particular benefit from Agile due to its ability to supplement a constant development pace and allow software to be delivered quickly.

The main reason I chose agile as my development methodology is because I am most familiar with it. It is the methodology we employ at Telesoft, and I have used it multiple times in the past for small projects. Furthermore, Agile works very well within the overarching project methodology of design thinking. The user-centric philosophy of design thinking can be utilised very effectively, as the needs of the end-user can be considered and adapted for at each stage of the development process. While I did not contact users during development, I used the data I had previously collected to build user stories, which aided in creating a solution tailored to their various use cases, requirements, and preferences.

Firstly, light users are those who will likely just use the application a couple times a week to get the details of a system they want to use, and to see if any are available. These users are unlikely to be frequently adding new systems monitoring the system details.

Heavy users, in contrast, are those who would be using the app on a daily basis to control systems they are using. They may be performing a job that requires frequent system power offs such as installing new hardware or flashing a new system image. In which case, the ease of use provided by the application would be greatly appreciated. These users would likely be low level developers who are most frequently moving between systems and setting up new ones to suit their requirements.

Finally, the Administrator user story concerns the few who would oversee the application’s user account system. This would most likely be the head of the department, as it would make the most sense if they were in control of access to the application. These users are most concerned with the user account control features and permission management.

With user stories defined, I developed the application on an iterative basis, following the agile approach with cycles of development, testing then planning the next iteration. 

I used the online project collaboration tool Trello to keep track of development. Trello has been highly useful in planning and organising development tasks, as it has allowed me to schedule and categorize activities based on priority. I also used it to document user stories, labelling notes based on the story they are concerned with. Taking user stories into consideration for each new task, feature and improvement has enabled me to make choices that best fit user needs. 

## Methods

Once my solution had been developed, I performed data collection involving the product’s user base to gauge how successful I had been in addressing the defined problem. 

I started by sending the link to the application hosted on firebase across the R&D department, allowing my co-workers to explore and go through it at their own pace. Doing so, I aimed to let the application speak for itself with minimal to no involvement, giving me a better chance to evaluate usability. Following this, the data collection methods I used were similar to that of the previous project.

I created a questionnaire consisting of questions with short to medium length written answers in order to collect the opinions of each user, making sure to include questions that address requirements for each user story. User experience regarding page layout, style and ease of use was also considered in questioning, as this is an important aspect in creating a piece of software that satisfies users. I also provided a section allowing users to express their disapproval and recommend their own features or changes.

Alongside the questionnaire, I had individual discussions with a couple of users that were the most enthusiastic about the application. I decided to target these users specifically because I believed they would be able to provide the most insightful feedback, as they were more invested in the project and its potential benefits. The reason I did this over more formal interviews is because I believed I would get minimal value out of individual questioning due to the relatively limited use case of the application. Answers provided from the initial questionnaire should be sufficient in gauging the general reception of the user base. In recognizing this imbalance in questioning, I hope to minimize the possible bias in my subsequent conclusion. 

## Conclusion

Users responded positively to my application and were overall enthusiastic in seeing it progress and get implemented in the office. The collected data made it clearer how high the demand for a solution such as this is in our department. Areas of praise included the layout of the dashboard, and the convenience in viewing system details.

I believe using Material UI was a good decision, as it both accelerated the development of the application with its rich library of components and created a consistent look and feel that was appreciated by users. It also made implementing responsiveness considerably easier with its grid-based layout and breakpoints. Even though it would be unlikely for users to use the application in the mobile format, a flexible design is valued because makes it easier for use in a variety of environments. For example, having the application in a split screen on a second monitor, something that would be commonly done among my co-workers.

A major setback during development was my inability to utilize Firebase cloud functions. Without them, I was very limited in how I could implement the user account system. For instance, it is not possible for a user to change the details of another user, nor is it possible to create a new user account without reauthentication. Because of this, I had to cut down several proposed features in my profile and user account control pages. The lacking features of the user account implementation was mentioned by users in the questionnaire.

Stat generation and simulation would have also benefited a lot from using cloud function, as it would have enabled more intensive operations such as frequently updating system data and stat polling to make the dashboard information appear realistic.

However, were the application to be deployed in the office, Firebase would not be used. Since the application contains sensitive data, we would need it to be fully maintained within our network and not outsourced. Instead, a server-side framework such as Express would be used to run commands on the system, alongside a module like sqlite3 to perform data persistence. 

Despite this, I believe I was able to demonstrate functionality successfully using Firebase, and its lack of difficulty in setting up data persistence, user accounts and deploying the application was valuable.

One criticism of my development cycle would be that I did not involve users in the process until development had finished. However, I believe this was acceptable considering the size and scope of the project. 

Despite the setbacks, I believe my application has been successful in demonstrating a solution for the identified issue, and it has been well-received by end-users. Moving forward, I would like to use this project as a basis for deploying the application in my workplace.

## Appendix

Trello project: https://trello.com/b/MmzbmEEF/server-rack-control-panel

![Screenshot of Trello board](/assets/trello.png)

### References

SEWELL, L., 2012. Agile software development. Delhi: Research World, pp.6-8
