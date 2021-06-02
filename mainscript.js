var contract; var account0;
var candidatename=[];

$(document).ready(function () {
    console.log('ready');
    web3 = new Web3(window.ethereum);
    var address = '0x205EaA2bC5A119EDa96a7Ca71836E303fBE26a25';
    var abi = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_name",
                    "type": "string"
                }
            ],
            "name": "addCandidate",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_person",
                    "type": "address"
                }
            ],
            "name": "authorize",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "end",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "start",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_voteIndex",
                    "type": "uint256"
                }
            ],
            "name": "vote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_name",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_person",
                    "type": "address"
                }
            ],
            "name": "checkVoterAuthorization",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "electionName",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getNumCandidates",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "goingon",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "showCandidates",
            "outputs": [
                {
                    "components": [
                        {
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "name": "voteCount",
                            "type": "uint256"
                        }
                    ],
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalvotes",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "voters",
            "outputs": [
                {
                    "name": "authorized",
                    "type": "bool"
                },
                {
                    "name": "voted",
                    "type": "bool"
                },
                {
                    "name": "vote",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]
    contract = new web3.eth.Contract(abi, address);
    setaccount();
    async function setaccount() {
        await ethereum.enable();
        account0 = await web3.eth.getAccounts().then(function (result) {
            return result[0];
        });
    }
})
$(document).on('click', '#vote-btn', function(){ 
    // Your Code
    console.log('click button function')
    var value=$('#0').val();
    contract.methods.vote(value).send({ from: account0 });
});
/*$('#0').click(async function () {
    console.log('click button function')
    var value=$('#0').val();
    contract.methods.vote(value).send({ from: account0 });
})*/

/*$('#1').click(async function () {
    contract.methods.vote(1).send({ from: account0 });
})
$('#2').click(async function () {
    contract.methods.vote(2).send({ from: account0 });
})
$('#3').click(async function () {
    contract.methods.vote(3).send({ from: account0 });
})*/
$('#button').click(async function () {
    console.log(contract);
    var add = $('#address').val();
    contract.methods.checkVoterAuthorization(add).call().then(function (res) {
        if (res == true)
            location.href = 'dynamic2vote.html';
        else
            alert("Unauthorised access");
    });

})

$('#walletbtn').click(async function () {
   // console.log('inside a#walletbtn')
    var add = $('#walletaddress').val();
    contract.methods.authorize(add).send({ from: account0 });
})

$('#startElection').click(async function () {
    contract.methods.start().send({ from: account0 });
})

$('#endElection').click(async function () {
    contract.methods.end().send({ from: account0 });
})
$('#totalVotes').click(async function () {
    contract.methods.totalvotes().call().then(function(res){
        alert(`Total Votes=${res}`);
    });
})

$('#add_candidate_btn').click(async function () {
     var name=$('#fname').val();    
    contract.methods.addCandidate(name).send({ from: account0 });
 })



   //alert("Unauthorized voter. pls contact admin")



