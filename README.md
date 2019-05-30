
Rice Image Classification Evaluator (R.I.C.E.) analyzes rice grain images to determine the
quality per crop. 


Certified graders manually examine numerious samples under a tight
harvesting schedule. By augmenting a pre-trained machine learning model using image classification, we
can expedite this labor intensive human process. 


Technologies Used: TensorFlow.js, MobileNet, React, Bootstrap



// USER PROFILES //

Rice Miller/Manager
Periodically monitors progress of paddy intake at own mill. Wants to know about overall 
paddy quality from all farmers for that crop season.
Usage: Medium

Rice Grader
Works around the clock during intake season. Determines the grade for each sample 
per trailer load. Reports paddy sample grade to Manager for payment calculations.
Usage: Heavy

Rice Board Member
Employed by the local government to create, update and enforce standards for the 
national rice industry. May work in a lab setting.
Usage: Light

Agricultural School Faculty / Student
Involved in the education of agricultural practices. May work in a lab setting.
Usage: Light


// ADDITIONAL FUNCTIONALITIES //

Create user account – with existing Facebook account or sign­up
Login – private user session to create and review grading records
Image analyzer – object detection using webcam
Location marker – user self­identify on a map
Grading reports – privatized; optional open reporting
