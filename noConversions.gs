//
// checks Accounts with no Conversions last week  
//

	function noConversions() {
  
  
	/// select accounts which fullfill your criteria(conditions)
   var accountIterator = MccApp.accounts()
  .withCondition("LabelNames CONTAINS 'check_performance'")
  .withCondition("Conversions < 1")
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
   	var NCMail = "\n  Account: " + accountName
    			+ "\n  Conversions: " + stats.getConversions() 
        		+ "\n  Klicks: " + stats.getClicks() 
    			+ "\n  Label: " + asanaBoardMail;
    
      
    //send E-Mail to Asana
    //uncomment when testing in Preview and use Loggers, it will also send E-Mails in Preview Mode
      
    /*
    MailApp.sendEmail({
    to: asanaBoardMail, 
    subject: 'Achtung, keine Conversions über Google Ads letzte Woche', 
    body: 'Dieser Account konnte letzte Woche keine Conversion in Google Ads verzeichnen. Bitte überprüfe das. Hier die Daten von Google Ads: ' + NCMail
  	});
    */
    
    
  /* 
  *   Logger checks - Use these to test when in Preview Mode
 */	  
      Logger.log(NCMail);
      Logger.log("The Account is " + accountName);
      Logger.log("E-Mail was sent to " + asanaBoardMail);
       
      }
    }
  }
