# fintech
<h2>Introduction</h2>
It is a system used used for signup and login purpose.
Database used is MongoDB which is connected using mongoose and Node Js(Express Js) is used as a framework. It uses JsonWebToken for creating tokens.
<h2>Key features</h2>
<ul>
<li>Log middleware is added for each type of request which store each request along with its statusCode.</li>
<li>User can get count of all type of requests made between different dates.</li>
<li>Duplicate candidates are not allowed</li>
</ul>
<h2> API's </h2>
<ul>
<li><h6>REMOTE_URL/user/signup</h6><p>Returns the user details that are saved in database if not already present.</p></li>
<li><h6>REMOTE_URL/user/login</h6><p>Returns json web token if login credentials are correct.</p></li>
<li><h6>REMOTE_URL/user/logs?from_date=""&to_date=""</h6><p>date format :- YYYY-MM-DD</p><p> condition :- from_date <= to_date</p><p>Returns the total logs in the given range of dates.</p></li>
</ul>
