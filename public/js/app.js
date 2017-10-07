const ajax_bz = require('./ajaxbz.js');
let sn = $('.dse');
let li = $('.dsc');
ajax_bz(sn,'/ajax/accounts');
ajax_bz(li,'/ajax/auth');