//
// Checks accounts with a Conversion Rate < 0.02
//

function checkCRPerformance() {
  
  
	/// select accounts which fullfill your criteria(conditions)
   var accountIterator = MccApp.accounts()
  .withCondition("LabelNames CONTAINS 'check_performance'")
  .withCondition("ConversionRate < 0.1")
  .withCondition("Conversions >= 4")
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
   	var CRMail = "\n  Account: " + accountName
    			+ "\n  Conversions: " + stats.getConversions() 
    			+ "\n  Conversion Rate: " + stats.getConversionRate() + "%"
    			+ "\n  Label: " + asanaBoardMail;
    
      
    //send E-Mail to Asana
    //uncomment when testing in Preview and use Loggers, it will also send E-Mails in Preview Mode
      
    /*
    MailApp.sendEmail({
    to: asanaBoardMail, 
    subject: 'Conversion Rate verbessern, liegt unter 0.1%', 
    body: 'Die totale Conversion Rate dieses Accounts ist eher schlecht, was negative Auswirkungen auf den ganzen Account hat. Schau dir folgende Zahlen an und versuche die Conversion Rate zu senken: ' + CRMail
  	});
    */
    
    
  /* 
  *   Logger checks - Use these to test when in Preview Mode
 */	  
      Logger.log(CRMail);
      Logger.log("The Account is " + accountName);
      Logger.log("E-Mail was sent to " + asanaBoardMail);
       
      }
    }
}
