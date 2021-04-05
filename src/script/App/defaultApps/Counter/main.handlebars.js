export let html = 
/*html*/`
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
<script src="//ajax.aspnetcdn.com/ajax/knockout/knockout-2.2.1.js"></script>
<script src="sevenSeg.js"></script>

<div class="Counter">
    <div id="example1">
        <h1>hello wrold</h1>
        <button onClick="test">click me</button>
    </div>
<div>

<script>
    function test() {
        console.log('test')
    }
    $("#example1").sevenSeg({ value: 5 });
    console.log('hello world')
</script>
`