function lineModel(personId, suppCodeId, srvcname, date,deal,ddate)
{
    this.PersonId = personId;
    this.SuppCodeId = suppCodeId;
    this.DateAndTime = (function () {
        var Dmesc = Date.parse(date);
        var d = new Date(Dmesc);
        return d.toDateString();
    })();
    this.Price = 0;
    this.NameServTyp = srvcname;
    this.Deal_setPrice = deal;
    this.DealDate = (function () {
        var Dmesc = Date.parse(ddate);
        var d = new Date(Dmesc);
        return d.toDateString();
    })();
    
    
}