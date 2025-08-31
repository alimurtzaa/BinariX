(function(){
    const bitsA = ['a3','a2','a1','a0'].map(id => document.getElementById(id));
    const bitsB = ['b3','b2','b1','b0'].map(id => document.getElementById(id));
    const resultBits = ['r3','r2','r1','r0'].map(cls => document.querySelector('.' + cls));
    
    const ops = {
      'op-and': { name:'AND', fn:(a,b)=> a & b },
      'op-or' : { name:'OR' , fn:(a,b)=> a | b },
      'op-xor': { name:'XOR', fn:(a,b)=> a ^ b },
      'op-nand': { name:'NAND', fn:(a,b)=> (a & b) ^ 1 },
      'op-nor' : { name:'NOR' , fn:(a,b)=> (a | b) ^ 1 },
      'op-xnor': { name:'XNOR', fn:(a,b)=> (a ^ b) ^ 1 },
      'op-nota': { name:'NOT A', fn:(a,b)=> a ^ 1 }, 
      'op-notb': { name:'NOT B', fn:(a,b)=> b ^ 1 } 
    };

    const opRadios = Object.keys(ops).map(id=>document.getElementById(id));
    const adec = document.getElementById('adec');
    const bdec = document.getElementById('bdec');
    const rdec = document.getElementById('rdec');

    function bitsToInt(arr){
      return (arr[0]<<3) | (arr[1]<<2) | (arr[2]<<1) | arr[3];
    }
    function activeGate(){
      const r = opRadios.find(r=>r.checked);
      return ops[r.id];
    }
    function valueOfBits(nodes){ return nodes.map(n=> n.checked ? 1 : 0); }

    function render(){
      const A = valueOfBits(bitsA);
      const B = valueOfBits(bitsB);
      const gate = activeGate();

      adec.textContent = bitsToInt(A);
      bdec.textContent = bitsToInt(B);

      const R = [0,1,2,3].map(i => gate.fn(A[i], B[i]));
      rdec.textContent = bitsToInt(R);
      
      R.forEach((bit, i) => {
        if (bit === 1) {
          resultBits[i].classList.add('active');
        } else {
          resultBits[i].classList.remove('active');
        }
      });
    }

    [...bitsA, ...bitsB, ...opRadios].forEach(el => el.addEventListener('change', render));
    render();
})();