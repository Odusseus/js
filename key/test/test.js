/*jshint esversion: 6 */

QUnit.test( "A Check test", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
  });

  QUnit.test( "isDebug should return false", function( assert ) {
    assert.ok( isDebug() == false, "Passed!" );
  });

  QUnit.test( "hashCode should return hashcode", function( assert ) {
    let dummy = 'dummy';
    
    assert.notEqual( dummy.hashCode(), "", "Passed!" );
    assert.notEqual( dummy.hashCode(), undefined, "Passed!" );
    assert.ok( dummy.hashCode() == 95945896, "Passed!" );
  });

  QUnit.test( "getHostName return sub-domain", function( assert ) { 
    assert.ok( getHostName('www.ing.nl') == 'ing.nl', "Passed!" );
    assert.ok( getHostName('ing.nl') == 'ing.nl', "Passed!" );
    assert.ok( getHostName('www.ing.nl/abc/abc.com') == 'ing.nl', "Passed!" );
    assert.ok( getHostName('http://www.ing.nl/abc/abc.com') == 'ing.nl', "Passed!" );
    assert.ok( getHostName('xxx.ing.nl/abc/abc.com') == 'ing.nl', "Passed!" );
  });