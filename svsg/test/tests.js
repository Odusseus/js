QUnit.test( "Default Svsg.GetColumn() return 0", function( assert ) {

    var column = Svsg.GetColumn();

    assert.ok( column == 0, "Passed!" );
  });

  QUnit.test( "Svsg.GetColumn() and Size is 10 return >= 0 <= 10", function( assert ) {
    
        Svsg.Globals.size = 10;
        var column = Svsg.GetColumn();
    
        assert.ok( column >= 0 && column <= 10, "Passed!" );
      });