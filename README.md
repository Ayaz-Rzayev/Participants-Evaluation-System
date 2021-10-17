# PROJECT PARTICIPANTS EVALUATION SYSTEM
#### Video Demo:  <URL HERE>
#### Contact Information: Github - Ayaz-Rzayev; Linkedin - Ayaz Rzayev
#### Description:
Web application was developed to automate process of project participants evaluation which was in use at my workplace.
The app has been developed with MVC design pattern.
Languages and Frameworks used are listed below:

  •	HTML5
  •	CSS
  •	Bootstrap
  •	JavaScript
  •	NodeJs
  •	Expreess
  •	MongoDB
  •	MongooseODM

Bcrypt was used for password hashing
And Crpto was used for Token generation 

Main function of the application is to give participants opportunity to evaluate each other based on the performance in 12 different criteria.
Those marks are used to calculate average score for each participant.
Calculation is done in a following way:
First app calculates average of criteria where 12th criteria has 50% of weight and first 11 criteria has other 50% 
thus app gets average rate from a voter to a specific participants

After all participants had voted Application admin submits the rates to calculate final results
final results are calculated as follows:
App calculates average of rates where project manager's rate to a participant has 50% of weight and whole team's average rate has other 50%
REMARK - voters rate to himself/herself doesn't count in calculation of averages

The overall flow of the application is as described below:
Participant opens web app and registers
If certain validation has been passed participants gets confirmation link to the marked e-mail address with unique user id and token
after e-mail verification participant gains access to main page where all projects are listed

Non admin users can:
•	access project participants evaluation page in projects they partook
•	edit their own votes before Admin submits rates to calculate results

Non admin users can't:
•	view projects they were not part of
•	add/edit/delete projects 
•	submit rates to calculate results
•	access users page or grant a user with Admin access

Admin users can:
•	add/edit/delete projects
•	access project participants evaluation page in projects they partook
•	edit their own votes before
•	submit rates to calculate results
•	access users page or grant a user with Admin access

