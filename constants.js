let THISDAY= new Date().getDate().toString();
let Tempmonth=new Date().getMonth().toString();
if (Tempmonth.length <=1)
{
  Tempmonth='0'+Tempmonth
}
if (THISDAY.length <=1)
{
  THISDAY='0'+THISDAY
}

const THISYEAR=new Date().getFullYear().toString();

export const TODAY= THISYEAR+'-'+Tempmonth+'-'+THISDAY;

//"2016-05-15"
