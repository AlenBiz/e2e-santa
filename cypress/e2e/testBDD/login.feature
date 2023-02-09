Feature: User login on santa website

Scenario: User logs in sucessfulls 
Given user on secret santa login page
When user logs in as "testbizyaev+test@gmail.com" and "rty123"



Scenario: User create box
Given user is dashboard page
When user is create box



Scenario: User  is get invantin
Given user is invantin page
When user is get invantin


Scenario: User is create card membership
Given user invantin link
When user logs in as "<login>" and "<password>"
When create card membership
Examples: 
|login|password|
|testbizyaev+test1@gmail.com|rty123|
|testbizyaev+test2@gmail.com|rty123|
|testbizyaev+test3@gmail.com|rty123|

Scenario: Conduct a draw
Given user on secret santa login page
When user logs in as "testbizyaev+test@gmail.com" and "rty123"
When user as conduct a draw


Scenario: checking Notifications
Given user on secret santa login page
When users logs in as "<login>" and "<password>"
When user checking Notifications
Examples: 
|login|password|
|testbizyaev+test1@gmail.com|rty123|
|testbizyaev+test2@gmail.com|rty123|
|testbizyaev+test3@gmail.com|rty123|


Scenario: Delete for API
Given Get cookie with logs in "testbizyaev+test@gmail.com" and "rty123"
When Delete for API
