function step(oldcolor, newcolor, x, y)
{
	var updates = 0;
	
	if(playfield[y][x] == oldcolor)
	{
		updates++;
		playfield[y][x] = newcolor;
		if(x < playfield[y].length-1) updates += step(oldcolor, newcolor, x+1, y);
		if(y < playfield.length-1) updates += step(oldcolor, newcolor, x, y+1);
		if(x > 0) updates += step(oldcolor, newcolor, x-1, y);
		if(y > 0) updates += step(oldcolor, newcolor, x, y-1);
	}
	
	return updates;
}

function turn(newcolor)
{
	if(newcolor == playfield[0][0]) return "get outta my office";
	
	var win = true;
	var pf = document.getElementById('playfield');
	var pfc = pf.getContext("2d");
	
	step(playfield[0][0], newcolor, 0, 0);
	
	for(y = 0; y < playfield.length; y++)
	{
		for(x = 0; x < playfield[y].length; x++)
		{
			if(playfield[y][x] != newcolor) win = false;
			
			pfc.beginPath();
			pfc.rect(x * pf.width/config['width'], y * pf.height/config['height'], pf.width/config['width'], pf.height/config['height']);
			pfc.fillStyle = config['colors'][playfield[y][x]][0];
			pfc.fill();
			pfc.lineWidth = 1;
			pfc.strokeStyle = config['colors'][playfield[y][x]][1];
			pfc.stroke();
		}
	}
	
	return win;
}

function fail(newcolor)
{
	var note = document.getElementById('notifications');
	
	note.innerHTML += "Playing " + newcolor + ": " + turn(newcolor) + "<br />";
}

var config = new Array();
config['colors'] = [
	['#ccacd2','#9761a9'],
	['#fec463','#f58842'],
	['#f8f49b','#f3dc73'],
	['#84d5f5','#4fa9de'],
	['#f8bbd5','#f08eb6'],
	['#eef5f8','#adb9c1']];
config['width'] = 16;
config['height'] = 9;

var playfield = new Array();
for(y = 0; y < config['height']; y++)
{
	playfield[y] = new Array();
	for(x = 0; x < config['width']; x++)
	{
		playfield[y][x] = Math.floor(Math.random()*config['colors'].length);
	}
}