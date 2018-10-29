//
// Checks with an overall bad Performance
//

function checkBadPerformance() {
  
  
	/// select accounts which fullfill your criteria(conditions)
   var accountIterator = MccApp.accounts()
  .withCondition("LabelNames CONTAINS 'check_performance'")
  .withCondition('Ctr < 0.03')
  .withCondition('AverageCpc > 1.00')
  .withCondition("ConversionRate < 0.02")
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
   	var BPMail = "\n  Account: " + accountName
    			+ "\n  Klicks: " + stats.getClicks().toFixed(0) 
    			+ "\n  Average CPC: " + stats.getAverageCpc() + " CHF"
    			+ "\n  CTR: " + stats.getCtr()
    			+ "\n  Conversions: " + stats.getConversions() 
    			+ "\n  Conversion Rate: " + stats.getConversionRate() + "%"
    			+ "\n  Label: " + asanaBoardMail;
    
      
    //send E-Mail to Asana
    //uncomment when testing in Preview and use Loggers, it will also send E-Mails in Preview Mode
      
    /*
    MailApp.sendEmail({
    to: asanaBoardMail, 
    subject: 'Alert! Der Account hat eine overall schlechte Performance', 
    body: 'Die Performance des Accounts ist schlecht. Schau dir bitte folgende Zahlen an und überpüfe sie: ' + BPMail + 
    'Wenn du nicht weisst, wie du die Performance steigern kannst, dann wende dich bitte an einen der Optimization Specialists oder an den Leiter Team DM.'
  	});
    */
    
    
  /* 
  *   Logger checks - Use these to test when in Preview Mode
 */	  
      Logger.log(BPMail);
      Logger.log("The Account is " + accountName);
      Logger.log("E-Mail was sent to " + asanaBoardMail);
       
      }
    }
}