//
//  ViewController.swift
//  Chat App
//
//  Created by Justin Wozniak on 2019-08-23.
//  Copyright © 2019 Justin Wozniak. All rights reserved.
//

import UIKit


class ViewController: UIViewController {
    


    @IBOutlet weak var sendMessage: UITextField!
    @IBOutlet weak var messageText: UITextView!
    
  
    let MYIPADDRESSNUMBERS = "10.3.109.14:8080"
    
    @IBOutlet weak var userNameField: UITextField!
    
    var historyArray: [String] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
       
        messageText.font = .systemFont(ofSize: 30)
        sendMessage.font = .systemFont(ofSize: 30)
        
        _ = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true, block: { timer in
            
            let justinsUrl = "http://" +  self.MYIPADDRESSNUMBERS + "/read_message"
            
            let url = URL(string:justinsUrl )!
            var dataString:String = "StartingString"
            let task = URLSession.shared.dataTask(with: url, completionHandler:
            { (data: Data?, response: URLResponse?, error: Error?) in
                print(data!)
                // this is where the completion handler code goes
                if let data = data {
                    dataString = String(NSString(data: data, encoding: String.Encoding.utf8.rawValue) ?? " ")
                    
                    var decodedString = dataString.removingPercentEncoding
                    
                    DispatchQueue.main.async {
                        if decodedString == self.sendMessage.text    {
                            
                            decodedString = " " + decodedString!.trimmingCharacters(in: .whitespacesAndNewlines)
                            let lastElement = self.historyArray.last
                            
                            if lastElement != decodedString {
                                self.historyArray.append(decodedString!)
                                print(self.historyArray)
                                let joined = self.historyArray.joined(separator: "\n ")
                                self.messageText.text = joined
                            }
                        }
                        else {
                            decodedString = " " + decodedString!
                            let lastElement2 = self.historyArray.last
                            if lastElement2 != decodedString {
                                self.historyArray.append(decodedString!)
                                let joined = self.historyArray.joined(separator: "\n ")
                                self.messageText.text = joined
                            }
                        }
                    
                    }
                }
                if let error = error {
                    print(error)
                };
            })

            task.resume()
            
       }
)}
    
    @IBAction func submitMessage(_ sender: Any) -> Void {
        let messageString = userNameField.text! + ": " + sendMessage.text!
        
        let encodedMessageSTring = messageString.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
        
        let justinsUrl = "http://" + MYIPADDRESSNUMBERS + "/write_message?message=" + encodedMessageSTring!

        let url = URL(string:justinsUrl )!

        let task = URLSession.shared.dataTask(with: url) {(data, response, error) in
            guard data != nil else { return }

        }

        task.resume()
        
    }
   
}
    
    
    
    

    
    


