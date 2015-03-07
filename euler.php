<!DOCTYPE HTML>
<html>
<head>
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta content='width=device-width, initial-scale=1' name='viewport'/>
<title>Project Euler - iSplasher</title>
		<link type="text/css" rel="stylesheet" href="style/style.css"/>
                <script type="text/javascript" language="Javascript"
        src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js">
        </script>
</head>
<?php include("static/upperpart.php"); ?>

<p class="title">Project Euler</p>

<section class="arrow_box_normal">
	<div id="toggle"><center>
<a href ="#" class="toggleAll" onclick="return toggleAll('para', true)">Show all code</a>
<span class="toggleAll">|</span>
<a href ="#" class="toggleAll" onclick="return toggleAll('para')">Hide all code</a>
</center></div>
<div class="header">Solved Problems</div>
<div id="euler">

<a href ="#" class="problems" onclick="return toggleMe('para1')">1. Multiples of 3 and 5 [Show code]</a>
<div class="code">
<div id="para1" class="text" style="display: none">
<code>
	<pre>
#include <iostream>
#include <cstdlib>

int main()
{
    int sum = 0;

    for (int a = 0; a <= 999; a++)
    {
        if((a % 3) == 0 || ((a % 5) == 0))
            sum += a;
    }

    std::cout << sum << std::endl;

    system("PAUSE");
    return 0;
}</pre>
	</code>
</div>
</div>

<a href ="#" class="problems" onclick="return toggleMe('para2')">2. Even Fibonacci numbers [Show code]</a>
<div class="code">
<div id="para2" class="text" style="display: none">
<code>
	<pre>
#include <iostream>

int main()
{
    int a = 1, b = 0, c = 1, d = 0, sum =0;

    for (int a; d < 4000000; a++)
    {
        if(a <= 1)
            d = c;
        else
        {
            d = b + c;
            b = c;
            c = d;
        }
        if(d % 2 == 0)
            sum += d;
    }

    std::cout << sum << std::endl;

    return 0;
}</pre>
	</code>
</div>
</div>

<a href ="#" class="problems" onclick="return toggleMe('para3')">6. Sum square difference [Show code]</a>
<div class="code">
<div id="para3" class="text" style="display: none">
<code>
	<pre>
#include <iostream>

int main()
{
    int a, b , c, d = 0, f = 0, h;

    for(a = 0; a <= 100; a++)
    {
        b = a*a;
        f += b;
        d += a;
    }
    c = d*d;
    h = c - f;

    std::cout << c << " - " << f << " = " << h << std::endl;

    return 0;
}</pre>
	</code>
</div>
</div>
</div>

</section>

<?php include("static/footer.php"); ?>