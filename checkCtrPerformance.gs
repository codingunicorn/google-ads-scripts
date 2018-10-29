//
// Checks accounts with a CTR < 3%
//

function checkCtrPerformance() {


	/// select accounts which fullfill your criteria(conditions)
   var accountIterator = MccApp.accounts()
  .withCondition("LabelNames CONTAINS 'check_performance'")
  .withCondition('Ctr < 0.03')
  .forDateRange("LAST_7_DAYS")
  .get();
  
  
	// iterate over selected accounts
  while(accountIterator.hasNext()){
    var account = accountIterator.next();
    var stats = account.getStatsFor('LAST_7_DAYS');
    var accountName = account.getName();
    
	//create a labelIterator with ONLY asanaBoard E-Mails in it
    var lblItr= account.labels()
    .withCondition("Name CONTAINS 'asana'")
    .get();
    
    while(lblItr.hasNext()){
      var accountLabel = lblItr.next();
      var asanaBoardMail = accountLabel.getName();
   
 	//create E-Mail Text
   	var CtrMail = "\n  Account: " + accountName
    			+ "\n  Klicks: " + stats.getClicks().toFixed(0) 
    			+ "\n  CTR: " + stats.getCtr()
    			+ "\n  Label: " + asanaBoardMail;
    
      
    //send E-Mail to Asana
    //uncomment when testing in Preview and use Loggers, it will also send E-Mails in Preview Mode
      
    /*
    MailApp.sendEmail({
    to: asanaBoardMail, 
    subject: 'CTR verbessern, liegt tiefer als 3%', 
    body: 'Der CTR dieses Accounts ist ungenügend. Schau dir folgende Zahlen an und versuche den CTR zu steigern: ' + CtrMail
  	});
    */
    
    
  /* 
  *   Logger checks - Use these to test when in Preview Mode
 */	  
      Logger.log(CtrMail);
      Logger.log("The Account is " + accountName);
      Logger.log("E-Mail was sent to " + asanaBoardMail);
       
      }
    }
}
