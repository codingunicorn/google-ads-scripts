///
// Checks campaigns with CPC > 1.01
///

function checkCpcPerformance() { 
  

	/// select accounts which fullfill your criteria(conditions)
   var accountIterator = MccApp.accounts()
  .withCondition("LabelNames CONTAINS 'check_performance'")
  .withCondition('AverageCpc > 1.01')
  .forDateRange("LAST_MONTH")
  .get();
  
  
	// iterate over selected accounts
  while(accountIterator.hasNext()){
    var account = accountIterator.next();
    var stats = account.getStatsFor('LAST_MONTH');
    var accountName = account.getName();
    
	//create a labelIterator with ONLY asanaBoard E-Mails in it
    var lblItr= account.labels()
    .withCondition("Name CONTAINS 'asana'")
    .get();
    
    while(lblItr.hasNext()){
      var accountLabel = lblItr.next();
      var asanaBoardMail = accountLabel.getName();
   
 	//create E-Mail Text
   	var CpcMail = "\n  Account: " + accountName
    			+ "\n  Klicks: " + stats.getClicks().toFixed(0) 
    			+ "\n  Average CPC: " + stats.getAverageCpc() + " CHF"
    			+ "\n  Label: " + asanaBoardMail;
    
      
    //send E-Mail to Asana
    //uncomment when testing in Preview and use Loggers, it will also send E-Mails in Preview Mode
      
    /*
    MailApp.sendEmail({
    to: asanaBoardMail, 
    subject: 'CPC verbessern, ist höher als 1.01 CHF', 
    body: 'Der CPC dieses Accounts ist eher schlecht. Schau dir folgende Zahlen an und versuche den CPC zu senken: ' + CpcMail
  	});
    */
    
    
  /* 
  *   Logger checks - Use these to test when in Preview Mode
 */	  
      Logger.log(CpcMail);
      Logger.log("The Account is " + accountName);
      Logger.log("E-Mail was sent to " + asanaBoardMail);
       
      }
    }
  } 
